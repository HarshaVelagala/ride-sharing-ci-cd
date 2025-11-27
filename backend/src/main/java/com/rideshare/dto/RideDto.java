package com.rideshare.dto;

import java.time.Instant;

public class RideDto {
    private Long id;
    private String pickup;
    private String dropoff;
    private Instant requestedAt;
    private String driver;

    public RideDto() {}

    public RideDto(Long id, String pickup, String dropoff, Instant requestedAt, String driver) {
        this.id = id;
        this.pickup = pickup;
        this.dropoff = dropoff;
        this.requestedAt = requestedAt;
        this.driver = driver;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPickup() {
        return pickup;
    }

    public void setPickup(String pickup) {
        this.pickup = pickup;
    }

    public String getDropoff() {
        return dropoff;
    }

    public void setDropoff(String dropoff) {
        this.dropoff = dropoff;
    }

    public Instant getRequestedAt() {
        return requestedAt;
    }

    public void setRequestedAt(Instant requestedAt) {
        this.requestedAt = requestedAt;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }
}
