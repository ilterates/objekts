class ScoresController < ApplicationController



  def index

  end
  def new
    @score = Score.new

  end
  def create
    @user = current_user
    puts params[:user_score]
    score_params = params.permit(:user_score)
    @score = Score.new(score_params)
    @score.save
    @user.score << @score
    render :nothing => true

  end
end
