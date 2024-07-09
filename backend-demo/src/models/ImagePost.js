const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ImagePost extends Model {
    static associate(models) {
      ImagePost.hasMany(models.Comment, { foreignKey: "imagePostId" });
    }
  }
  ImagePost.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ImagePost",
    }
  );
  return ImagePost;
};
