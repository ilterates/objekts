class ScoresController < ApplicationController

  def index
    @top_scores = Score.all.limit(20).order('top_score DESC')
    @score_show = false;
  end
  def new
    @score = Score.new

  end
  def create
    # @user = User.find_by_id(params[:id])
    score_params = params.permit(:top_score)
    @score = Score.new(score_params)
    @score.save
    render :nothing => true
  end
end
