CREATE TABLE transaction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount double NOT NULL,
    quantity INT NOT NULL,
    coin_name VARCHAR(255),
    transaction_type ENUM('PURCHASED', 'SOLD') NOT NULL,
    transaction_status ENUM('FAILED', 'PROCESSING', 'SUCCESS') NOT NULL,
    transaction_date DATE NOT NULL,
    receiver_name VARCHAR(45),
    user_id INT NOT NULL,
    crypto_id VARCHAR(45) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES minet_bc_128_user.user(id),
    FOREIGN KEY (crypto_id) REFERENCES minet_bc_128_crypto.cryptocurrency(id)
);