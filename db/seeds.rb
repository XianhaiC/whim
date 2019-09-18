# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Account.destroy_all

jonathan = Account.create(handle: "Jonathan", email: "jonny@gmail.com", password: "helloworld", password_confirmation: "helloworld")
andy = Account.create(handle: "Andy", email: "andy@gmail.com", password: "helloworld", password_confirmation: "helloworld")
nate = Account.create(handle: "Nate", email: "nate@gmail.com", password: "helloworld", password_confirmation: "helloworld")

Impulse.destroy_all

gaming_impulse = Impulse.create(name: "Gaming", description: "A place to discuss gaming")
sports_impulse = Impulse.create(name: "Sports", description: "A place to discuss sports")

Spark.destroy_all

cooldude123 = Spark.create(name: "cooldude123", account_id: jonathan.id, impulse_id: gaming_impulse.id, session_token: "1")
fooldude123 = Spark.create(name: "fooldude123", account_id: andy.id, impulse_id: gaming_impulse.id, session_token: "2")
tooldude123 = Spark.create(name: "tooldude123", account_id: nate.id, impulse_id: gaming_impulse.id, session_token: "3")

mandude123 = Spark.create(name: "mandude123", impulse_id: sports_impulse.id, session_token: "4")
fandude123 = Spark.create(name: "fandude123", impulse_id: sports_impulse.id, session_token: "5")
tandude123 = Spark.create(name: "tandude123", impulse_id: sports_impulse.id, session_token: "6")

MessageThread.destroy_all

gaming_thread = MessageThread.create(impulse_id: gaming_impulse.id)
sports_impulse = MessageThread.create(impulse_id: sports_impulse.id)

Message.destroy_all

Message.create(body: "Hello", spark_id: cooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: false)

Message.create(body: "what's up", spark_id: fooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: false)

Message.create(body: "Not much", spark_id: cooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: false)

Message.create(body: "Did you see the new game that came out the other day?", spark_id: fooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: false)

Message.create(body: "Which one? There's so many I can't keep track y'know", spark_id: cooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: false)

Message.create(body: "The new skyrim game. It's sick", spark_id: fooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: false)

Message.create(body: "I heard it sucks, actually", spark_id: tooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: false)

Message.create(body: "Elaborate", spark_id: cooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: false)

Message.create(body: "Well, the story is cliche, the mechanics are derivative", spark_id: tooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: false)

# create inspirations

inspo_1 = Message.create(body: "Idea for game: battle royale card game", spark_id: cooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: gaming_thread.id, is_inspiration: true)
inspo_thread_1 = MessageThread.create(impulse_id: gaming_impulse.id, inspiration_id: inspo_1.id);

Message.create(body: "That's a pretty cool idea. What kind of theme would the game have?", spark_id: tooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: inspo_thread_1.id, is_inspiration: false)
Message.create(body: "Dungeoneering? not sure yet.", spark_id: cooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: inspo_thread_1.id, is_inspiration: false)
Message.create(body: "nonetheless, balancing the game is gonna be hard", spark_id: tooldude123.id, impulse_id: gaming_impulse.id, message_thread_id: inspo_thread_1.id, is_inspiration: false)
