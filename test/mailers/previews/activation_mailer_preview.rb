# Preview all emails at http://localhost:3000/rails/mailers/activation_mailer
class ActivationMailerPreview < ActionMailer::Preview
  def activation_mail_preview
    ActivationMailer.activation_email(Account.first)
  end
end
