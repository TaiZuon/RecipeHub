package com.recipehub.recipe_service.dto.request;

public class PredictionRequest {
    private String dishName; // Tên món ăn
    private String modelType; // Loại mô hình ('decision_tree', 'naive_bayes', 'knn')

    // Getter và Setter
    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public String getModelType() {
        return modelType;
    }

    public void setModelType(String modelType) {
        this.modelType = modelType;
    }
}
