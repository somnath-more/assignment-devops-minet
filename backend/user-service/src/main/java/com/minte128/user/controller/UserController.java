package com.minte128.user.controller;

import com.minte128.user.dto.LoginDTO;
import com.minte128.user.dto.UserDTO;
import com.minte128.user.exception.NotFoundException;
import com.minte128.user.exception.UserAlreadyExists;
import com.minte128.user.service.JwtService;
import com.minte128.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@Slf4j
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH}, allowedHeaders = "*", exposedHeaders = "Access-Control-Allow-Origin")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public UserController(UserService userService, JwtService jwtService, ModelMapper modelMapper) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public  UserDTO createNewUser(@RequestBody UserDTO userDTO) {
        log.info("post new user");
        return userService.createUser(userDTO);
    }

    @PostMapping("/login")
    public  ResponseEntity<LoginDTO> loginUser(@Validated @RequestBody UserDTO userDTO) {
        log.info("login request");
        UserDTO user = userService.loginUser(userDTO);
        LoginDTO loginDTO;
        String token = jwtService.generateToken(userDTO.getEmail(), user.getPassword());
        loginDTO = new LoginDTO("user authenticated", true, userDTO.getEmail(), token, user.getId());
        return new ResponseEntity<>(loginDTO, HttpStatus.OK);
    }

    @PatchMapping("/{userId}")
    public  ResponseEntity<UserDTO> updateUser(@PathVariable Integer userId, @RequestBody UserDTO userDTO ) {
        UserDTO updatedUser = userService.updateUser(userId, userDTO);
        updatedUser.setPassword("confidential");
        return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> getToken(@Validated @RequestBody UserDTO auth) {
        log.info("get token");
        String email = auth.getEmail();
        String password = auth.getPassword();
        System.out.println(email+"----"+password);
        UserDTO user = userService.getUserByEmail(email);
        if (user == null) {
            UserDTO createdUser= createNewUser(auth);
            createdUser.setPassword("confidential");
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } else {
            throw new UserAlreadyExists("User with email already exists: " + email);
        }
    }
    @GetMapping
    public  ResponseEntity<UserDTO> getUserIdByEmail(@RequestParam String email){
        UserDTO user = userService.getUserByEmail(email);
        if (user == null) {
            throw new NotFoundException("User with email not exists: " + email);
        } else {
            user.setPassword("confidential");
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }


}
