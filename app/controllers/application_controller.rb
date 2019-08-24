class ApplicationController < ActionController::API

  # functions for login authentication
  protected
    def attempt_login
      unless login_authorized?
        return
      end
      @current_account = Account.find(auth_token_login[:account_id])
      rescue JWT::VerificationError, JWT::DecodeError
        return
    end

    def authenticate_login!
      unless login_authorized?
        render json: { errors: ['Login not authenticated: Token mismatch'] }, status: :unauthorized
        return
      end
      @current_account = Account.find(auth_token_login[:account_id])
      rescue JWT::VerificationError, JWT::DecodeError
        render json: { errors: ['Login not authenticated: Account not found'] }, status: :unauthorized
    end

    def authenticate_spark!
      unless spark_authorized?
        render json: { errors: ['Spark not authenticated: Token mismatch'] }, status: :unauthorized
        return
      end
      @current_spark = Spark.find(auth_token_spark[:spark_id])
      rescue JWT::VerificationError, JWT::DecodeError
        render json: { errors: ['Spark not authenticated: Spark not found'] }, status: :unauthorized
    end

  private
    def http_token_login
      @http_token_login ||= if request.headers['AuthorizationLogin'].present?
        request.headers['AuthorizationLogin'].split(' ').last
      end
    end

    def auth_token_login
      @auth_token_login ||= JsonWebToken.decode(http_token_login)
    end

    def login_authorized?
      http_token_login && auth_token_login && auth_token_login[:account_id].to_i
    end

    def http_token_spark
      @http_token_spark ||= if request.headers['AuthorizationSpark'].present?
        request.headers['AuthorizationSpark'].split(' ').last
      end
    end

    def auth_token_spark
      @auth_token_spark ||= JsonWebToken.decode(http_token_spark)
    end

    def spark_authorized?
      http_token_spark && auth_token_spark && auth_token_spark[:spark_id].to_i
    end
end
