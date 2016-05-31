class UsersController < ApplicationController

  def index

  end

  def show
    @user = User.find_by_id(params[:id])
  end

  def new
    @user = User.new
  end
  def create

    @user = User.create(params)

    redirect_to '/'
  end

  def scores

  end

  private

  def params
    params.require(:user).permit(:username, :password)
  end
end
