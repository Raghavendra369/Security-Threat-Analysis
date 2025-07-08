def to_serializable(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc
