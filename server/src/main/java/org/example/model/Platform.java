package org.example.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Platform extends PanacheEntity {
    public String name;
    public String cloudType; // VMware, Oracle, Azure
    public String location; // HQ, Welikada, Pitipana
    public String poolTag;
    
    // Memory
    public double memoryTotal;
    public double memoryUsed;
    
    // vCPU
    public int vcpuTotal;
    public int vcpuUsed;
    
    // Storage
    public String storageType; // HDD, SSD
    public double storageTotal;
    public double storageUsed;
    
    // Helper methods
    public double getMemoryPercentage() {
        return (memoryUsed / memoryTotal) * 100;
    }
    
    public double getVcpuPercentage() {
        return ((double)vcpuUsed / vcpuTotal) * 100;
    }
    
    public double getStoragePercentage() {
        return (storageUsed / storageTotal) * 100;
    }
}