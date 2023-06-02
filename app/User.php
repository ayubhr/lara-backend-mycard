<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username','online',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','callback_key','callback_hash','ip',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'perms' => 'frontend'
        ];
    }


    public function useros()
    {
        return $this->hasMany(User::class,'id');

    }

    public function childs()
    {

        return $this->hasMany(User::class, 'parent')->select(array('id', 'username', 'sold_sport','sold_casino','sold_livecasino','role','parent'));

    }

    public function juniors()
    {

        return $this->hasMany(User::class, 'parent')->with('childs')->select(array('id', 'username', 'sold_sport','sold_casino','sold_livecasino','role','parent'));

    }


    public function seniors()
    {

        return $this->hasMany(User::class, 'parent')->with('juniors')->select(array('id', 'username', 'sold_sport','sold_casino','sold_livecasino','role','parent'));

    }


}
