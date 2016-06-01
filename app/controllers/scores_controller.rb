class ScoresController < ApplicationController

  def index
    @scores = Score.all
    render :index
  end
  def new
    @score = Score.new

  end
  def create
    score_params = params.require(:score).permit(:user_score)
    @score = Score.create
  end
end
