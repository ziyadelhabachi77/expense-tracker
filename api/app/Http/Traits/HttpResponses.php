<?php

namespace App\Http\Traits;

trait HttpResponses
{
    protected  function success(array|object $data,string|null $message = null,int $code = 200)
    {

        $response = ['status' => 'Request was successful'];


        if (!empty($data)) {
            $response['data'] = $data;
        }
        if($message) {
            $response['message'] = $message;
        }

        return response()->json($response, $code);
    }


    protected  function error(array|object $data,string|null $message = null,int $code = 200)
    {

        $response = ['status' => 'Error has occurred...'];


        if ($data) {
            $response['data'] = $data;
        }
        if($message) {
            $response['message'] = $message;
        }

        return response()->json($response, $code);
    }
}
