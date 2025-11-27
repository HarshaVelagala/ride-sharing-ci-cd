package com.rideshare.controller;

import com.rideshare.dto.RideDto;
import com.rideshare.service.RideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @GetMapping
    public ResponseEntity<List<RideDto>> list() {
        return ResponseEntity.ok(rideService.listRides());
    }

    @PostMapping
    public ResponseEntity<RideDto> create(@RequestBody RideDto dto) {
        return ResponseEntity.ok(rideService.bookRide(dto));
    }
}
