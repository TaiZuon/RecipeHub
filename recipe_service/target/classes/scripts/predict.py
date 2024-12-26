import sys
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import ast
import json

# Kiểm tra nếu có đủ tham số
if len(sys.argv) != 3:
    print("Usage: python predict.py <dish_name> <model_type>")
    sys.exit(1)

# Lấy tham số từ dòng lệnh
dish_name = sys.argv[1]  # Tên món ăn (ví dụ: 'Egg-Fried-Rice')
model_type = sys.argv[2]  # Loại mô hình (ví dụ: 'decision_tree')

# Đường dẫn đến mô hình và vectorizer
model_path = "D:/hoc_tap/project/RecipeHub/recipe_service/src/main/resources/ai_models/"

# Đọc vectorizer từ file
try:
    with open("D:/hoc_tap/project/RecipeHub/recipe_service/src/main/resources/ai_models/vectorizer.pkl", 'rb') as vectorizer_file:
        vectorizer = joblib.load(vectorizer_file)
except FileNotFoundError:
    print("Vectorizer file not found!")
    sys.exit(1)

# Biến đổi món ăn thành vector
X = vectorizer.transform([dish_name])

# Xác định mô hình tương ứng với tham số 'model_type'
if model_type == 'decision_tree':
    model_filename = "dt_model.pkl"
elif model_type == 'naive_bayes':
    model_filename = "nb_model.pkl"
elif model_type == 'knn':
    model_filename = "knn_model.pkl"
else:
    print("Unknown model type.")
    sys.exit(1)

# Đọc mô hình từ file
try:
    with open(model_path + model_filename, 'rb') as model_file:
        model = joblib.load(model_file)
except FileNotFoundError:
    print(f"Model file {model_filename} not found!")
    sys.exit(1)

# Dự đoán với mô hình đã huấn luyện
predicted_label = model.predict(X)

label_encoder = joblib.load("D:/hoc_tap/project/RecipeHub/recipe_service/src/main/resources/ai_models/label_encoder.pkl")

recipe = label_encoder.inverse_transform(predicted_label)


# Chuyển đổi chuỗi thành đối tượng Python hợp lệ
recipe_data = ast.literal_eval(recipe[0])

recipe_data['Ingredients'] = ast.literal_eval(recipe_data['Ingredients'])

# Chuyển đổi thành chuỗi JSON
recipe_json = json.dumps(recipe_data, indent=4)

print(recipe_json)