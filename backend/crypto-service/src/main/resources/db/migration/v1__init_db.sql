CREATE TABLE cryptocurrency (
    id  VARCHAR(45) PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    market_cap VARCHAR(45) NOT NULL,
    volume VARCHAR(45) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    circulating_supply BIGINT NOT NULL,
    abbreviation VARCHAR(45) NOT NULL,
    image VARCHAR(45) NOT NULL
);

CREATE TABLE wishlist (
    id INT PRIMARY KEY,
    crypto_id VARCHAR(45) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (crypto_id) REFERENCES cryptocurrency(id),
    FOREIGN KEY (user_id) REFERENCES minet_bc_128_user.user(id)
);

CREATE TABLE holdings (
    id INT PRIMARY KEY,
    amount INT NOT NULL,
    crypto_id VARCHAR(45) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (crypto_id) REFERENCES cryptocurrency(id),
    FOREIGN KEY (user_id) REFERENCES minet_bc_128_user.user(id)
);
