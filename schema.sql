CREATE TABLE IF NOT EXISTS users
(
    id       SERIAL PRIMARY KEY,
    email    VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)        NOT NULL
);

CREATE TABLE IF NOT EXISTS categories
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS brands
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER      NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- CREATE TABLE IF NOT EXISTS packages
-- (
--     id          SERIAL PRIMARY KEY,
--     name        VARCHAR(255) NOT NULL,
--     description TEXT,
--     created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE IF NOT EXISTS products
-- (
--     id          SERIAL PRIMARY KEY,
--     name        VARCHAR(255) NOT NULL,
--     brand_id    INTEGER      NOT NULL,
--     category_id INTEGER      NOT NULL,
--     package_id  INTEGER      NOT NULL,
--     created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (brand_id) REFERENCES brands (id),
--     FOREIGN KEY (category_id) REFERENCES master-categories (id),
--     FOREIGN KEY (package_id) REFERENCES packages (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS attributes
-- (
--     id          SERIAL PRIMARY KEY,
--     name        VARCHAR(255) NOT NULL,
--     category_id INTEGER      NOT NULL,
--     created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (category_id) REFERENCES master-categories (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS attribute_values
-- (
--     id           SERIAL PRIMARY KEY,
--     attribute_id INTEGER      NOT NULL,
--     value        VARCHAR(255) NOT NULL,
--     created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (attribute_id) REFERENCES attributes (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS product_attributes
-- (
--     id           SERIAL PRIMARY KEY,
--     product_id   INTEGER NOT NULL,
--     attribute_id INTEGER NOT NULL,
--     created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (product_id) REFERENCES products (id),
--     FOREIGN KEY (attribute_id) REFERENCES attributes (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS product_variants
-- (
--     id         SERIAL PRIMARY KEY,
--     product_id INTEGER      NOT NULL,
--     name       VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (product_id) REFERENCES products (id)
-- );
--
-- CREATE TABLE IF NOT EXISTS units
-- (
--     id         SERIAL PRIMARY KEY,
--     name       VARCHAR(255) NOT NULL,
--     package_id INTEGER      NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (package_id) REFERENCES packages (id)
-- );
--
-- -- Create indexes
-- CREATE INDEX if not exists idx_products_brand_id ON products (brand_id);
--
-- CREATE INDEX if not exists idx_products_category_id ON products (category_id);
--
-- CREATE INDEX if not exists idx_products_package_id ON products (package_id);
--
-- CREATE INDEX if not exists idx_product_attributes_product_id ON product_attributes (product_id);
--
-- CREATE INDEX if not exists idx_product_attributes_attribute_id ON product_attributes (attribute_id);
--
-- CREATE INDEX if not exists idx_product_variants_product_id ON product_variants (product_id);
--
--
-- -- Create a foreign key constraint between brands and master-categories on a new column
-- ALTER TABLE brands
--     ADD COLUMN brand_id INTEGER;
--
-- ALTER TABLE brands
--     ADD CONSTRAINT fk_brands_category
--         FOREIGN KEY (brand_id) REFERENCES brands (id);
