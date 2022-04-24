package com.example.sitaris_kp.service;

import com.example.sitaris_kp.exception.ResourceNotFoundException;
import com.example.sitaris_kp.model.User;

import com.example.sitaris_kp.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public Optional<User> findById(Long id) {

        return userRepository.findById(id);
    }


    public User saveOrUpdate(User user) {
        return userRepository.saveAndFlush(user);
    }

    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            userRepository.deleteById(id);
            jsonObject.put("message", "User deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }

    public ResponseEntity<User> findByUserId(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + id));
        return ResponseEntity.ok(user);
    }
    public User findByIdUser(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + id));
    }
    public User updateUser(User user1){

        User user = findByIdUser(user1.getId());
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        user1.setRole(user.getRole());
        user1.setCreateAt(user.getCreateAt());
        return userRepository.save(user1);
    }
    public Page<User> findAll(Pageable pageable){
        return userRepository.findAll(pageable);
    }
    public Page<User> findAll(Pageable pageable, String searchText) {
        return userRepository.findAllUserPageable(pageable, searchText);
    }
    public User getUser(String username) {
        return userRepository.findByEmail(username);
    }

}
