const { Users } = require('../models');
const { Posts } = require('../models');
const { Comments } = require('../models');

class CommentRepository {
    CreateComment = async (postId, userId, comment) => {
        return Comments.create({ postId, userId, comment });
    };
    FindOnePost = async (postId) => {
        return Posts.findOne({
            where: {
                postId,
            },
            include: {
                model: Users,
                attributes: ['nickname'],
            },
        });
    };
    FindOneComment = async (commentId) => {
        const comment = await Comments.findOne({
            where: { commentId },
            attributes: ['commentId', 'userId', 'comment', 'updatedAt'],
            include: {
                model: Users,
                attributes: ['nickname'],
            },
            raw:true
        });
        return {
            commentId: comment.commentId,
            userId: comment.userId,
            nickname: comment['User.nickname'],
            comment: comment.comment,
            updatedAt: comment.updatedAt,
        };
    };
    UpdateComment = async (comment, commentId) => {
        const a = await Comments.update({ comment }, { where: { commentId } });
        console.log(a)
        return;
    };
    DeleteComment = async (commentId) => {
        return Comments.destroy({ where: { commentId } });
    };
    FindAllComment = async (postId) => {
        const comments = await Comments.findAll({
            raw: true,
            where: { postId },
            attributes: ['commentId', 'userId', 'comment', 'updatedAt'],
            include: {
                model: Users,
                attributes: ['nickname'],
            },
        });
        return comments.map((comment) => {
            return {
                commentId: comment.commentId,
                userId: comment.userId,
                nickname: comment['User.nickname'],
                comment: comment.comment,
                updatedAt: comment.updatedAt,
            };
        });
    };
}

module.exports = CommentRepository;
