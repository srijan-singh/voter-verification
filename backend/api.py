import face_recognition
import uvicorn
import shutil
from fastapi import Form, File, UploadFile, FastAPI

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data_file = "source.png"
target_file = "target.png"
data_label = ["Default"]

database = dict()

@app.get("/")
def index():
    return {"response" : "Face Recognition API"}


@app.post("/upload/source")
async def upload_image(name:str = Form(...), source_image:UploadFile = File(...)):
    
    data_label[0] = name

    with open(data_file, "wb") as buffer:
        shutil.copyfileobj(source_image.file, buffer)

    return {"response": "uploaded source image"}


@app.post("/upload/target")
async def target_image(target_image: UploadFile = File(...)):

    with open(target_file, "wb") as buffer:
        shutil.copyfileobj(target_image.file, buffer)

    return {"response": "uploaded target image"}


@app.get("/result")
async def Prediction():
    known_image = face_recognition.load_image_file(data_file)
    unknown_image = face_recognition.load_image_file(target_file)

    known_encoding = face_recognition.face_encodings(known_image)[0]
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

    database[data_label[0]] = known_encoding

    for encoding in database:
        results = face_recognition.compare_faces([database[encoding]], unknown_encoding)

        if results[0] == True:
            return {"response":encoding}
        
    return {"response":"unknown"}


if __name__=="__main__":
    uvicorn.run(app, port=8000)