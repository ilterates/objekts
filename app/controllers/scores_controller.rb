class ScoresController < ApplicationController



  def index

  end
  def new
    @score = Score.new

  end
  def create
    @user = current_user
    score_params = params.permit(:user_score)
    @score = Score.new(score_params)
    @score.save
    @user.scores << @score
    render :nothing => true
  end
end
