<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jackpots extends Model
{

    protected $table = 'jackpots';

    protected $primaryKey = 'id';

    protected $fillable = ['shop', 'amount', 'max_limit', 'winner', "rate", 'created_at', 'updated_at'];



}