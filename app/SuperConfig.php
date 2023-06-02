<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SuperConfig extends Model
{

    protected $table = 'supers_config';

    protected $primaryKey = 'id';

    protected $fillable = ['super', 'telegram', 'created_at', 'updated_at'];

}
