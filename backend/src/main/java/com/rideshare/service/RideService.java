package com.rideshare.service;

import com.rideshare.dto.RideDto;
import com.rideshare.model.Ride;
import com.rideshare.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RideService {

    private final RideRepository rideRepository;

    public RideService(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }

    public List<RideDto> listRides() {
        if (rideRepository.count() == 0) {
            seedRides();
        }
        return rideRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public RideDto bookRide(RideDto request) {
        Ride ride = new Ride();
        ride.setPickup(request.getPickup());
        ride.setDropoff(request.getDropoff());
        ride.setRequestedAt(Instant.now());
        ride.setDriver("Demo Driver");
        return toDto(rideRepository.save(ride));
    }

    private RideDto toDto(Ride ride) {
        return new RideDto(
                ride.getId(),
                ride.getPickup(),
                ride.getDropoff(),
                ride.getRequestedAt(),
                ride.getDriver()
        );
    }

    private void seedRides() {
        Ride sample = new Ride();
        sample.setPickup("5th Avenue");
        sample.setDropoff("Central Park");
        sample.setRequestedAt(Instant.now().minusSeconds(1800));
        sample.setDriver("Alex Rider");
        rideRepository.save(sample);
    }
}
