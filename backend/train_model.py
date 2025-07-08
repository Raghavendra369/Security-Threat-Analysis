import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

# Load CSV file
df = pd.read_csv("cyber_threats.csv")

# Feature & label
X = df["Cleaned Threat Description"].astype(str)
y = df["Threat Category"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# TF-IDF + SVM pipeline
pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),          # Unigrams + Bigrams
        max_features=5000,           # Limit vocab size
        min_df=2                     # Ignore rare terms
    )),
    ("clf", LinearSVC(max_iter=2000))
])

# Train
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
print("\n🔍 Classification Report:\n")
print(classification_report(y_test, y_pred))

# Save model and vectorizer
with open("model.pkl", "wb") as f_model:
    pickle.dump(pipeline.named_steps["clf"], f_model)

with open("vectorizer.pkl", "wb") as f_vec:
    pickle.dump(pipeline.named_steps["tfidf"], f_vec)

print("\n Improved model and vectorizer saved as model.pkl and vectorizer.pkl")
