class ActivationMailer < ApplicationMailer

  def activation_email(account)
    @account = account
    puts "CREATING MAIL"
    mail(to: account.email, subject: 'Account activation')
  end
end
