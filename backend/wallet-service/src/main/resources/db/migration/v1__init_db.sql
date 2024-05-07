CREATE TABLE wallet (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    amount DOUBLE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES minet_bc_128_user.user(id)
);