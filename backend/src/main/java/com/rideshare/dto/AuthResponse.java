package com.rideshare.dto;

public class AuthResponse {
    private String token;
    private String displayName;

    public AuthResponse(String token, String displayName) {
        this.token = token;
        this.displayName = displayName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
