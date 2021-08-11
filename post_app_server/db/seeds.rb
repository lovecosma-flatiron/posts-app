# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Post.create(title: "My first Post!", content: "I'm such a great poster! Like me!")
Post.create(title: "My second Post!", content: "I'm ok. Can you like me?")
Post.create(title: "My third Post!", content: "jjjjjjjjjjjjj")


Comment.create(content: "This is an awesome post! Liked!", post_id: 1)
Comment.create(content: "Awesome! Liked!", post_id: 1)

Comment.create(content: "Love this!", post_id: 2)
Comment.create(content: "Awesome!", post_id: 2)

puts "Info seeded."
