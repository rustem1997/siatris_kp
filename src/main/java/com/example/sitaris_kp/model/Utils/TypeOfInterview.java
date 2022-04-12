package com.example.sitaris_kp.model.Utils;

public enum TypeOfInterview {
    TEST("Тест"),
    CALL("Созвон"),
    IN_OFFICE("В офисе");

    private final String name;

    TypeOfInterview(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "TypeOfInterview{" +
                "name='" + name + '\'' +
                '}';
    }
}
