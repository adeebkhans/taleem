import json
from collections import defaultdict

def categorize_by_community(input_file, output_file):
    # Load the existing JSON data
    with open(input_file, "r", encoding='utf-8') as f:
        data = json.load(f)

    # Categorize by community
    categorized_data = defaultdict(list)
    for item in data:
        community = item.get("community", "Unknown")
        key = f"{community}-Institutes"
        categorized_data[key].append(item)

    # Convert defaultdict to a regular dict and write to output JSON
    with open(output_file, "w", encoding='utf-8') as f:
        json.dump(dict(categorized_data), f, ensure_ascii=False, indent=4)

    print(f"Data categorized by community and saved to {output_file}")

# Paths for input and output JSON files
input_file = "institutions.json"
output_file = "categorized_institutions.json"

categorize_by_community(input_file, output_file)
