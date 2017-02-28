var Search = (function() {
  return {
    search: function(btn) {
      // make sure we run the final pp before searching
      do_pp(collect_pp_args($('#query_prep>table')));
      // collect search params
      var ds_info = collect_ds_info();
      var post_data = {
        ds_name: ds_info.name,
        ds_kind: ds_info.kind,
        pp: collect_pp_args($('#pp_options')),
        metric: $('#wsm_metric > option:selected').val(),
        param: $('#wsm_param').text(),
        min_window: $('#wsm_min_window').text(),
        num_comps: $('#wsm_endmembers').text(),
        score_pct: $('#wsm_score_pct').text(),
        fignum: fig.id
      };
      add_resample_args($('#resample_options'), post_data);
      add_baseline_args($('#blr_options'), post_data);
      // search
      var res = $('#wsm_results').fadeOut(),
          wait = $('.wait', btn).show(),
          err_span = $(btn).next('.err_msg');
      $.ajax({
        url: '/_search',
        type: 'POST',
        data: post_data,
        success: function(data) {
          wait.hide();
          err_span.empty();
          res.html(data).fadeIn();
          $('button', res).prop('disabled', false);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          wait.hide();
          err_span.text(jqXHR.responseText);
          $('button', res).prop('disabled', true);
        }
      });
    },
    compare: function(names, target_name, target_kind) {
      var post_data = {
        compare: JSON.stringify(names),
        target_name: target_name,
        target_kind: target_kind,
        pp: collect_pp_args($('#pp_options')),
        fignum: fig.id
      };
      add_resample_args($('#resample_options'), post_data);
      add_baseline_args($('#blr_options'), post_data);
      $.post('/_compare', post_data);
    },
    download: function() {
      window.open('/'+fig.id+'/search_results.csv', '_blank');
    },
  };
})();