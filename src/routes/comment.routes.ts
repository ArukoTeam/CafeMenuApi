import express from 'express';
import { CommentController } from '../controllers/comment.controller';
import { uploadFile } from '../middlewares/uploadFile.middleware';

const router = express.Router();

router.post(
    '/',
    uploadFile.single('image'),
    validate(createCommentSchema),
    CommentController.create
);

export default router;
