package com.AI_Powered_E_Commerce.controller;



import com.AI_Powered_E_Commerce.entity.Product;
import com.AI_Powered_E_Commerce.service.ProductService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(
            ProductService productService) {

        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(
            @PathVariable Long id) {

        return productService.getProductById(id);
    }

    @PostMapping
    public Product addProduct(
            @RequestBody Product product) {

        return productService.addProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return productService
                .updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return "Product deleted successfully";
    }

    @GetMapping("/search")
    public List<Product> search(
            @RequestParam String keyword) {

        return productService
                .searchProducts(keyword);
    }

    @GetMapping("/category/{category}")
    public List<Product> category(
            @PathVariable String category) {

        return productService
                .getByCategory(category);
    }

    @GetMapping("/recommendations/{category}")
    public List<Product> recommendations(
            @PathVariable String category) {

        return productService
                .getRecommendations(category);
    }
}
