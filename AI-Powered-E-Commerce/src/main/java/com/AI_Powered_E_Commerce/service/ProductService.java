package com.AI_Powered_E_Commerce.service;



import com.AI_Powered_E_Commerce.entity.Product;
import com.AI_Powered_E_Commerce.repository.ProductRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Product not found"
                        )
                );
    }

    public Product addProduct(Product product) {

        return productRepository.save(product);
    }

    public Product updateProduct(
            Long id,
            Product product) {

        Product existing =
                getProductById(id);

        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setCategory(product.getCategory());
        existing.setImageUrl(product.getImageUrl());
        existing.setStock(product.getStock());
        existing.setRating(product.getRating());

        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {

        productRepository.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {

        return productRepository
                .findByNameContainingIgnoreCase(keyword);
    }

    public List<Product> getByCategory(String category) {

        return productRepository
                .findByCategoryIgnoreCase(category);
    }

    /*
     * Simple recommendation logic.
     *
     * In a production project this can be replaced
     * with a real ML/AI recommendation service.
     */
    public List<Product> getRecommendations(
            String category) {

        return productRepository
                .findByCategoryIgnoreCase(category);
    }
}
