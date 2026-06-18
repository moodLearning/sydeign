use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'first_name',
        'last_name',
        'email_address',
        'username',
        'password',
        'phone_number',
    ];

    protected $hidden = [
        'password',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    public function customer()
    {
        return $this->hasOne(Customer::class);
    }

    public function merchant()
    {
        return $this->hasOne(Merchant::class);
    }
}
