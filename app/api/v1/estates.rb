require 'action_controller/metal/strong_parameters'
class Estates < Grape::API
  format 'json'
  helpers do
    def estate_params
      ActionController::Parameters.new(params)
        .require(:estate).permit(
          :title, :city, :country, :address, :price,
          :lng, :lat
        )
    end
  end

  resource :estates do

    desc "Return list of estates"
    get '/' do
      present :estates, Estate.order(created_at: :desc)
    end

    desc 'Create new estate object'
    params do
      requires :estate, type: Hash
    end
    post do
      authorize
      estate = Estate.create(estate_params)
      present :estate, estate
    end

    desc "Update estate object"
    params do
      requires :estate, type: Hash
      requires :id, type: Integer
    end
    put ':id' do
      authorize
      estate = Estate.find(params[:id])
      estate.update_attributes(estate_params)
      present :estate, estate
    end

    desc "Return estate object"
    params do
      requires :id, type: String
    end
    get ':id' do
      authorize
      present :estate, Estate.find(params[:id])
    end

    desc "Delete estate object"
    params do
      requires :id, type: String
    end
    delete ':id' do
      authorize
      Estate.find(params[:id]).destroy
    end

  end
end
