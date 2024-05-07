package com.minte128.user.service;

import com.minte128.user.dto.UserDTO;
import com.minte128.user.entity.User;
import com.minte128.user.exception.NotFoundException;
import com.minte128.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = userRepository.save(modelMapper.map(userDTO, User.class));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO loginUser(UserDTO userDTO) {
        Optional<User> user = userRepository.findByEmail(userDTO.getEmail());
        if (user.isPresent()) {
            User savedUser = user.get();
            if (savedUser.isPasswordValid(userDTO.getPassword())) {
                return modelMapper.map(savedUser, UserDTO.class);
            } else {
                throw new NotFoundException("Invalid credentials");
            }
        } else {
            throw new NotFoundException("User with email:" + userDTO.getEmail() + "is not present");
        }
    }

    @Override
    public UserDTO updateUser(Integer id, UserDTO userDTO) {
        UserDTO userById = this.findUserById(id);
        userById.setPassword(userDTO.getPassword());
        User savedUser = userRepository.save(modelMapper.map(userById, User.class));
        return modelMapper.map(savedUser, UserDTO.class);
    }

    public UserDTO findUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User currentUser = user.get();
            return modelMapper.map(currentUser, UserDTO.class);
        }
        throw new NotFoundException("User with id:" + id + "is not present");
    }

    public UserDTO getUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            return modelMapper.map(userOptional.get(), UserDTO.class);
        } else {
            return null;
        }
    }
}
