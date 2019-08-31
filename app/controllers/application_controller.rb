class ApplicationController < ActionController::API
  INVITE_HASH_LENGTH = 8

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

    def authenticate_login
      unless login_authorized?
        puts "LOGIN_RET #{@auth_token_session}"
        render json: { errors: ["Login not authenticated: Token mismatch"] }, status: :unauthorized
        return
      end
      @current_account = Account.find(auth_token_login[:account_id])
      rescue JWT::VerificationError, JWT::DecodeError
        render json: { errors: ["Login not authenticated: Account not found"] }, status: :unauthorized
    end

    def authenticate_session
      unless session_authorized?
        puts "OUT #{@auth_token_session}"
        render json: { errors: ["Session not authenticated: Token mismatch"] }, status: :unauthorized
        return
      end
      @current_session_token = auth_token_session[:auth_token]
    end

  # utility
    def gen_hash(length) 
      o = [('a'..'z')].map(&:to_a).flatten
      string = (0...length).map { o[rand(o.length)] }.join
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

    def http_token_session
      puts "PROBELM HTTP"
      @http_token_session ||= if request.headers['AuthorizationSession'].present?
        request.headers['AuthorizationSession'].split(' ').last
      end
    end

    def auth_token_session
      puts "TOKM #{http_token_session}"
      @auth_token_session ||= JsonWebToken.decode(http_token_session)
      puts "PROBELM #{@auth_token_session}"
      return @auth_token_session
    end

    def session_authorized?
      http_token_session && auth_token_session
    end
end
