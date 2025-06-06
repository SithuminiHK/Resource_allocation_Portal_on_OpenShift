package org.example;

import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.model.Platform;

import java.util.Set;
import java.util.List;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.ClaimValue;
import jakarta.inject.Inject;

@Path("/api/platforms")
public class ResourceController {

    @Inject
    @Claim(standard = Claims.preferred_username)
    ClaimValue<String> usernameClaim;

    @Inject
    @Claim(standard = Claims.groups)
    ClaimValue<Set<String>> groupsClaim;

    // Get all platforms (viewer, operator, admin)
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"view-only", "operators", "super-admin"})
    public List<Platform> getAllPlatforms() {
        return Platform.listAll();
    }

    // Get single platform (viewer, operator, admin)
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"view-only", "operators", "super-admin"})
    public Platform getPlatform(@PathParam("id") Long id) {
        Platform platform = Platform.findById(id);
        if (platform == null) {
            throw new NotFoundException();
        }
        return platform;
    }

    // Create platform (admin only)
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("super-admin")
    @Transactional
    public Response createPlatform(Platform platform) {
        try {
            if (platform.name == null || platform.name.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Platform name is required")
                    .build();
            }
            platform.persist();
            return Response.status(Response.Status.CREATED).entity(platform).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("Error creating platform: " + e.getMessage())
                .build();
        }
    }

    // Update platform (operator and admin)
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"operators", "super-admin"})
    @Transactional
    public Platform updatePlatform(@PathParam("id") Long id, Platform updatedPlatform) {
        Platform platform = Platform.findById(id);
        if (platform == null) {
            throw new NotFoundException();
        }
        
        // Update fields
        platform.name = updatedPlatform.name;
        platform.cloudType = updatedPlatform.cloudType;
        platform.location = updatedPlatform.location;
        platform.poolTag = updatedPlatform.poolTag;
        
        // Resource updates
        platform.memoryTotal = updatedPlatform.memoryTotal;
        platform.memoryUsed = updatedPlatform.memoryUsed;
        platform.vcpuTotal = updatedPlatform.vcpuTotal;
        platform.vcpuUsed = updatedPlatform.vcpuUsed;
        platform.storageType = updatedPlatform.storageType;
        platform.storageTotal = updatedPlatform.storageTotal;
        platform.storageUsed = updatedPlatform.storageUsed;
        
        return platform;
    }

    // Delete platform (admin only)
    @DELETE
    @Path("/{id}")
    @RolesAllowed("super-admin")
    @Transactional
    public Response deletePlatform(@PathParam("id") Long id) {
        Platform platform = Platform.findById(id);
        if (platform == null) {
            throw new NotFoundException();
        }
        platform.delete();
        return Response.noContent().build();
    }

    // Additional endpoints for specific operations
    
    // Update only resources (operator)
    @PATCH
    @Path("/{id}/resources")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"operators", "super-admin"})
    @Transactional
    public Platform updateResources(
        @PathParam("id") Long id, 
        @QueryParam("memoryUsed") Double memoryUsed,
        @QueryParam("vcpuUsed") Integer vcpuUsed,
        @QueryParam("storageUsed") Double storageUsed
    ) {
        Platform platform = Platform.findById(id);
        if (platform == null) {
            throw new NotFoundException();
        }
        
        if (memoryUsed != null) platform.memoryUsed = memoryUsed;
        if (vcpuUsed != null) platform.vcpuUsed = vcpuUsed;
        if (storageUsed != null) platform.storageUsed = storageUsed;
        
        return platform;
    }
}