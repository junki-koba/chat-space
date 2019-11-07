json.array! @messages do |message|
  json.content message.content
  json.created_at message.created_at
  json.user_name message.user.name
  json.id message.id
  json.image message.image.url
end