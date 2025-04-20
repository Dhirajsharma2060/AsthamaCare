from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(required=True)
    username = fields.Str(required=True)
    email = fields.Str(required=True)

class MessageSchema(Schema):
    id = fields.Int(required=True)
    user_id = fields.Int(required=True)
    content = fields.Str(required=True)
    timestamp = fields.DateTime(required=True)

class ChatSchema(Schema):
    id = fields.Int(required=True)
    messages = fields.List(fields.Nested(MessageSchema))