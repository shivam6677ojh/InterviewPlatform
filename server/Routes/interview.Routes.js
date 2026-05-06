import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
import { analyzeResume, finishInterview, genrateQuestions, getInterviewReport, getMyInterviews, SubmitAnswer } from '../controllers/interview.controller.js';


const interviewRouter = express.Router();

interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume);
interviewRouter.post("/generate-questions", isAuth, genrateQuestions);
interviewRouter.post("/submit-answers", isAuth , SubmitAnswer);
interviewRouter.post("/finish", isAuth, finishInterview);
interviewRouter.get("/get-interview", isAuth, getMyInterviews);
interviewRouter.get("/report/:id", isAuth, getInterviewReport);


export default interviewRouter;