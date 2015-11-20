require 'action_controller/metal/strong_parameters'
class Estates < Grape::API
  format 'json'
  helpers do
    def estate_params
      ActionController::Parameters.new(params)
        .require(:estate).permit(
          :title, :city, :country, :address, :price
        )
    end
  end

  resource :estates do

    desc "Return list of estates"
    get '/' do
      authorize
      present :estates, Estate.order(created_at: :desc)
    end

    desc 'Create new estate object'
    params do
      requires :estate, type: Hash
    end
    post do
      estate = Estate.create(estate_data)
      present :estate, estate
    end

    desc "Update estate object"
    params do
      requires :estate, type: Hash
      requires :id, type: Integer
    end
    put ':id' do
      Estate.find(params[:id]).update_attributes(estate_params)
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
      Estate.find(params[:id]).destroy
    end

  end
end
