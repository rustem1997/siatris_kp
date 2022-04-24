package com.example.sitaris_kp.model.Utils;

import lombok.Getter;

@Getter
public enum StatusOnResolve {
    ACCEPT("интервью принято"),
    REFUSE("интервью отказано"),
    ON_WAITING("в ожидании ответа");
    private final String name;

    StatusOnResolve(String name) {
        this.name = name;
    }
}
