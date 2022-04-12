package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Role;
import javafx.css.Rule;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Rule, Long> {
Role findByName(String name);
}
