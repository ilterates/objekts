class UsersController < ApplicationController

 before_action :logged_in?, except: [:new, :create]

  def index
    @score_show = true;
  end

  def show
    @user = User.find_by_id(params[:id])
    @scores = @user.scores.limit(10).order('user_score DESC')
    @score_show = false
  end

  def new
    @user = User.new
    @score_show = false
  end
  def create

    @user = User.create(user_params)
    login(@user)

    redirect_to @user
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
