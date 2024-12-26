package com.recipehub.recipe_service.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.recipehub.recipe_service.dto.request.PredictionRequest;
import com.recipehub.recipe_service.dto.response.PredictionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/predict")
public class PredictionController {

    @PostMapping("/dish")
    public ResponseEntity<PredictionResponse> predictRecipe(@RequestBody PredictionRequest request) {
        String dishName = request.getDishName();
        String modelType = request.getModelType();

        String jsonResponse = runPythonScript(dishName, modelType);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            PredictionResponse predictions = objectMapper.readValue(jsonResponse,
                    new TypeReference<PredictionResponse>() {});
            return ResponseEntity.ok(predictions);
        } catch (JsonProcessingException e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private String runPythonScript(String dishName, String modelType) {
        try {
            // Đường dẫn đến script Python và tham số truyền vào
            String pythonScriptPath = "D:\\hoc_tap\\project\\RecipeHub\\recipe_service\\src\\main\\resources\\scripts\\predict.py";
            String[] command = new String[]{"python", pythonScriptPath, dishName, modelType};

//            System.out.println(Arrays.toString(command));

            // Chạy script Python
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            Process process = processBuilder.start();

            // Đọc kết quả trả về từ Python
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            int exitCode = process.waitFor();
            if (exitCode == 0) {
//                System.out.println(output.toString());
                return output.toString(); // Trả về kết quả dự đoán
            } else {
                return "Error bruh: " + output.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred while running the Python script.";
        }
    }
}
