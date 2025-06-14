import express from 'express';
import { CommentController } from '../../controllers/comment.controller';
import { upload } from '../../middlewares/upload.middleware';
import validate from '../../middlewares/validate.middleware';
import { createCommentSchema } from '../validations/comment.schema';

const router = express.Router();

router.post(
    '/',
    upload.single('image'),
    validate(createCommentSchema),
    CommentController.create
);

export default router;
