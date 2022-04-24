package com.example.sitaris_kp.service;

import com.example.sitaris_kp.exception.ResourceNotFoundException;
import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.model.UserInformation;
import com.example.sitaris_kp.repository.UserInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserInformationService {
    @Autowired
    private UserInformationRepository userInformationRepository;

    @Autowired
    private UserService userService;

    public void saveAccountImage(MultipartFile file,Long id) throws IOException {
        UserInformation userInformation = findByIdUser(id);
        userInformation.setAccountImage(file.getBytes());
        userInformationRepository.save(userInformation);
    }
    public UserInformation saveUserInformation(UserInformation userInformation, Long id) {
        User user = userService.findByIdUser(id);
        if(findByIdUserInformation(user.getId()) != null){
            return userInformation;
        }
        userInformation.setUserId(user);
        return userInformationRepository.save(userInformation);
    }

    public ResponseEntity<UserInformation> findUserInformationByUserId(Long id){
        UserInformation userInformation = userInformationRepository.findByUserId(userService.findByIdUser(id));
        return ResponseEntity.ok(userInformation);
    }
    public ResponseEntity<UserInformation> findUserInformationByUserInformationId(Long id){
        UserInformation userInformation = userInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User information not exist with id:" + id));
        return ResponseEntity.ok(userInformation);
    }

    public UserInformation findByIdUserInformation(Long id){
        return userInformationRepository.findByUserId(userService.findByIdUser(id));
    }

    public UserInformation findByIdUser(Long id){

        return userInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User information not exist with id:" + id));
    }

    public UserInformation updateUserInformation(UserInformation userInformation){
        UserInformation userInformation1 = findByIdUser(userInformation.getId());
        userInformation.setAccountImage(userInformation1.getAccountImage());

        userInformation.setId(userInformation1.getId());

        userInformation.setUserId(userInformation1.getUserId());
        return userInformationRepository.save(userInformation);
    }


}
